DROP PROCEDURE IF EXISTS #CREATE_AUDITLOG_TRIGGERS
GO

------------------------------------------

CREATE PROCEDURE #CREATE_AUDITLOG_TRIGGERS
AS

------------------------------------------

DECLARE @SQL          NVARCHAR(MAX)
DECLARE @TABLE_NAME   SYSNAME
DECLARE @TRIGGER_NAME SYSNAME
DECLARE @TRIGGER_BODY NVARCHAR(MAX)

SET @TRIGGER_BODY = 
N'AFTER INSERT, UPDATE
AS

SET NOCOUNT ON

---------------------------------------

BEGIN TRY

  DECLARE @SQL           NVARCHAR(MAX)
  DECLARE @COL_LIST      NVARCHAR(MAX)
  DECLARE @CONV_COL_LIST NVARCHAR(MAX)
  DECLARE @TABLE_NAME    SYSNAME
  DECLARE @ERRMSG        NVARCHAR(MAX)
  
  SELECT @TABLE_NAME = OBJECT_NAME(PARENT_OBJECT_ID) 
    FROM SYS.OBJECTS 
   WHERE NAME = OBJECT_NAME(@@PROCID)  
  
  ;WITH COLS
  AS
  (
  SELECT QUOTENAME(C.NAME) AS COLUMN_NAME, 
         T.NAME            AS COLUMN_TYPE
    FROM SYS.COLUMNS C
    JOIN SYS.TYPES T
      ON C.USER_TYPE_ID = T.USER_TYPE_ID
   WHERE C.OBJECT_ID = OBJECT_ID(@TABLE_NAME)
   --kivetelek
     AND C.NAME NOT IN (N''Id'',
                        N''RowVersion'',
                        N''Creator'',
                        N''Created'',
                        N''LastModifier'',
                        N''LastModified'',
                        N''IsReadOnly'') 
     AND NOT (OBJECT_NAME(C.OBJECT_ID) = N''Users'' AND C.NAME IN (N''RefreshToken'',N''Password''))
  )
  SELECT @COL_LIST      = STUFF((SELECT N'','' + COLUMN_NAME  
                                   FROM COLS 
                                    FOR XML PATH(''''), TYPE).value(''(./text())[1]'', ''NVARCHAR(MAX)''),1,1,''''),
         @CONV_COL_LIST = STUFF((SELECT N'','' + CASE COLUMN_TYPE
                                                 WHEN N''datetime2'' 
                                                 THEN N''COALESCE(CONVERT(NVARCHAR(MAX),'' + COLUMN_NAME + N'', 25),N'''''''')'' + N'' AS '' + COLUMN_NAME
                                                 ELSE N''COALESCE(CONVERT(NVARCHAR(MAX),'' + COLUMN_NAME + N''),N'''''''')'' + N'' AS '' + COLUMN_NAME
                                               END
                                   FROM COLS 
                                    FOR XML PATH(''''), TYPE).value(''(./text())[1]'', ''NVARCHAR(MAX)''),1,1,'''')
  
--------------------------------------

SELECT * INTO #inserted FROM inserted

IF NOT EXISTS (SELECT 1 FROM deleted)
  BEGIN
  
  --insert
  
  --AuditLogEntities

    SET @SQL = N''INSERT INTO AuditLogEntities''                                         + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''       Created,''                                                      + CHAR(10)
             + N''       Creator,''                                                      + CHAR(10)
             + N''       LastModified,''                                                 + CHAR(10)
             + N''       LastModifier,''                                                 + CHAR(10)
             + N''       EntityId,''                                                     + CHAR(10)
             + N''       EntityName''                                                    + CHAR(10)
             + N'')''                                                                    + CHAR(10)
             + N''SELECT GETDATE()          AS Created,''                                + CHAR(10)
             + N''       Creator            AS Creator,''                                + CHAR(10)
             + N''       GETDATE()          AS LastModified,''                           + CHAR(10)
             + N''       NULL               AS LastModifier,''                           + CHAR(10)
             + N''       Id                 AS EntityId,''                               + CHAR(10)
             + N''       N''''Sda.HRPortal.Core.'' + @TABLE_NAME + N'''''' AS EntityName''     + CHAR(10)
             + N''  FROM #inserted''
      
    --SELECT @SQL
    EXEC sp_executesql @SQL
    
  --AuditlogProperties

    SET @SQL = N'';WITH PIVOT_TABLE AS''                                                 + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''SELECT PivotEntityId,''                                                + CHAR(10)
             + N''       COLUMN_NAME,''                                                  + CHAR(10)
             + N''       COLUMN_VALUE,''                                                 + CHAR(10)             
             + N''       Creator''                                                       + CHAR(10)
             + N''  FROM (SELECT Id AS PivotEntityId,Creator,CONVERT(NVARCHAR(MAX),id) AS Id,'' 
             +                  @CONV_COL_LIST                                         + CHAR(10)
             + N''          FROM #inserted) P ''                                         + CHAR(10)
             + N''UNPIVOT (COLUMN_VALUE FOR COLUMN_NAME IN (Id,'' + @COL_LIST + N'')) UP'' + CHAR(10)
             + N'')''                                                                    + CHAR(10)
             + N''INSERT INTO AuditLogProperties''                                       + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''       Created,''                                                      + CHAR(10)
             + N''       Creator,''                                                      + CHAR(10)
             + N''       LastModified,''                                                 + CHAR(10)
             + N''       LastModifier,''                                                 + CHAR(10)
             + N''       AuditLogEntityId,''                                                + CHAR(10)
             + N''       PropertyName,''                                                 + CHAR(10)
             + N''       OldValue,''                                                     + CHAR(10)
             + N''       NewValue,''                                                     + CHAR(10)
             + N''       Action''                                                        + CHAR(10)
             + N'')''                                                                    + CHAR(10)
             + N''SELECT GETDATE()          AS Created,''                                + CHAR(10)
             + N''       P.Creator          AS Creator,''                                + CHAR(10)
             + N''       GETDATE()          AS LastModified,''                           + CHAR(10)
             + N''       NULL               AS LastModifier,''                           + CHAR(10)
             + N''       A.ID               AS AuditLogEntityId,''                          + CHAR(10)
             + N''       P.COLUMN_NAME      AS PropertyName,''                           + CHAR(10)
             + N''       CASE''                                                          + CHAR(10)
             + N''         WHEN P.COLUMN_NAME = N''''Id''''''                                + CHAR(10)
             + N''         THEN P.COLUMN_VALUE''                                         + CHAR(10)
             + N''         ELSE N''''''''''                                                  + CHAR(10)
             + N''       END                AS OldValue,''                               + CHAR(10)
             + N''       P.COLUMN_VALUE     AS NewValue,''                               + CHAR(10)
             + N''       N''''Hozzáadás''''       AS Action''                                + CHAR(10)
             + N''  FROM PIVOT_TABLE P''                                                 + CHAR(10)
             + N'' OUTER APPLY (SELECT TOP 1 Id''                                        + CHAR(10)
             + N''                FROM AuditLogEntities AL''                             + CHAR(10)
             + N''               WHERE P.PivotEntityId = AL.EntityId''                   + CHAR(10)
             + N''               ORDER BY AL.Id DESC) A''
    
    --SELECT @SQL
    EXEC sp_executesql @SQL

  END
ELSE
  BEGIN
  
  --update

  --AuditlogProperties

    SELECT * INTO #deleted FROM deleted
       
    IF EXISTS (SELECT Id FROM #inserted EXCEPT SELECT Id FROM #deleted)
      BEGIN
        SET @ERRMSG = N''Auditlog error, cannot update Id column'' + CHAR(10)
                    + N''Table: '' + @TABLE_NAME                   + CHAR(10)
        ;THROW 50001, @ERRMSG, 1
      END
     
    SET @SQL = N'';WITH INS_PIVOT_TABLE AS''                                             + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''SELECT Id,''                                                           + CHAR(10)
             + N''       COLUMN_NAME,''                                                  + CHAR(10)
             + N''       COLUMN_VALUE,''                                                 + CHAR(10)             
             + N''       LastModifier''                                                  + CHAR(10)
             + N''  FROM (SELECT Id,LastModifier,'' + @CONV_COL_LIST                     + CHAR(10)
             + N''          FROM #inserted) P ''                                         + CHAR(10)
             + N''UNPIVOT (COLUMN_VALUE FOR COLUMN_NAME IN ('' + @COL_LIST + N'')) UP''    + CHAR(10)
             + N''),''                                                                   + CHAR(10)
             + N''DEL_PIVOT_TABLE AS''                                                   + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''SELECT Id,''                                                           + CHAR(10)
             + N''       COLUMN_NAME,''                                                  + CHAR(10)
             + N''       COLUMN_VALUE''                                                  + CHAR(10)
             + N''  FROM (SELECT Id,'' + @CONV_COL_LIST                                  + CHAR(10)
             + N''          FROM #deleted) P ''                                          + CHAR(10)
             + N''UNPIVOT (COLUMN_VALUE FOR COLUMN_NAME IN ('' + @COL_LIST + N'')) UP''    + CHAR(10)
             + N'')''                                                                    + CHAR(10)
             + N''INSERT INTO AuditLogProperties''                                       + CHAR(10)
             + N''(''                                                                    + CHAR(10)
             + N''       Created,''                                                      + CHAR(10)
             + N''       Creator,''                                                      + CHAR(10)
             + N''       LastModified,''                                                 + CHAR(10)
             + N''       LastModifier,''                                                 + CHAR(10)
             + N''       AuditLogEntityId,''                                                + CHAR(10)
             + N''       PropertyName,''                                                 + CHAR(10)
             + N''       OldValue,''                                                     + CHAR(10)
             + N''       NewValue,''                                                     + CHAR(10)
             + N''       Action''                                                        + CHAR(10)
             + N'')''                                                                    + CHAR(10)
             + N''SELECT GETDATE()          AS Created,''                                + CHAR(10)
             + N''       IPT.LastModifier   AS Creator,''                                + CHAR(10)
             + N''       GETDATE()          AS LastModified,''                           + CHAR(10)
             + N''       NULL               AS LastModifier,''                           + CHAR(10)
             + N''       A.ID               AS AuditEntityId,''                          + CHAR(10)
             + N''       IPT.COLUMN_NAME    AS PropertyName,''                           + CHAR(10)
             + N''       DPT.COLUMN_VALUE   AS OldValue,''                               + CHAR(10)
             + N''       IPT.COLUMN_VALUE   AS NewValue,''                               + CHAR(10)
             + N''       N''''Módosítás''''       AS Action''                                + CHAR(10)
             + N''  FROM INS_PIVOT_TABLE IPT''                                           + CHAR(10)
             + N''  JOIN DEL_PIVOT_TABLE DPT''                                           + CHAR(10)
             + N''    ON IPT.Id = DPT.Id''                                               + CHAR(10)             
             + N''   AND IPT.COLUMN_NAME = DPT.COLUMN_NAME''                             + CHAR(10)
             + N''   AND IPT.COLUMN_VALUE <> DPT.COLUMN_VALUE''                          + CHAR(10)
             + N'' OUTER APPLY (SELECT TOP 1 Id''                                        + CHAR(10)
             + N''                FROM AuditLogEntities AL''                             + CHAR(10)
             + N''               WHERE IPT.Id = AL.EntityId''                            + CHAR(10)
             + N''               ORDER BY AL.Id DESC) A''
    
    --SELECT @SQL
    EXEC sp_executesql @SQL

  END
  
END TRY
BEGIN CATCH
  IF @ERRMSG IS NULL
    BEGIN
      SET @ERRMSG = N''Generic Auditlog error''                                      + CHAR(10)
                  + N''Table: ''          + @TABLE_NAME                              + CHAR(10)
                  + N''Error message: ''  + ERROR_MESSAGE()                          + CHAR(10)
                  + N''Error severity: '' + CONVERT(NVARCHAR(MAX), ERROR_SEVERITY()) + CHAR(10)
                  + N''Error state: ''    + CONVERT(NVARCHAR(MAX), ERROR_STATE())    + CHAR(10)
                  + N''Error line: ''     + CONVERT(NVARCHAR(MAX), ERROR_LINE())     + CHAR(10)
                  + N''Sql: ''            + @SQL 
      ;THROW 50000, @ERRMSG, 1
    END
    ;THROW
END CATCH'

DECLARE C0 CURSOR LOCAL FAST_FORWARD FOR
  SELECT T.NAME AS TABLE_NAME
    FROM SYS.TABLES T
   WHERE T.NAME NOT LIKE N'AuditLog%'
     AND T.NAME NOT LIKE N'TMP%'
     AND T.NAME NOT IN (N'__EFMigrationsHistory',
                        N'sysdiagrams')

------------------------------------------

  OPEN C0
  FETCH NEXT FROM C0 INTO @TABLE_NAME
  WHILE @@FETCH_STATUS = 0
  BEGIN
    BEGIN TRY
     
      SET @TRIGGER_NAME = @TABLE_NAME + N'_Auditlog_Trigger'

      --drop
      SET @SQL = N'DROP TRIGGER IF EXISTS ' + @TRIGGER_NAME
      EXEC sp_executesql @SQL
      
      --create
      SET @SQL = N'CREATE TRIGGER ' + @TRIGGER_NAME + ' ON ' + @TABLE_NAME + CHAR(10) + @TRIGGER_BODY
      EXEC sp_executesql @SQL
      
      --enable
      SET @SQL = N'ALTER TABLE ' + @TABLE_NAME + ' ENABLE TRIGGER ' + @TRIGGER_NAME
      EXEC sp_executesql @SQL 
      
    END TRY
    BEGIN CATCH
      PRINT(@TRIGGER_NAME + N' fail')
      PRINT(@SQL)

      /*
      SELECT T.NAME                   AS TRIGGER_NAME,
             OBJECT_NAME(T.OBJECT_ID) AS TABLE_NAME,
             T.IS_DISABLED            AS IS_DISABLED
        FROM SYS.TRIGGERS T
      RETURN*/
    END CATCH  
  FETCH NEXT FROM C0 INTO @TABLE_NAME
  END
  CLOSE C0
  DEALLOCATE C0

------------------------------------------

SELECT T.NAME                   AS TRIGGER_NAME,
       OBJECT_NAME(T.PARENT_ID) AS TABLE_NAME,
       T.IS_DISABLED            AS IS_DISABLED
  FROM SYS.TRIGGERS T
 ORDER BY 2 ASC
GO

------------------------------------------

EXEC #CREATE_AUDITLOG_TRIGGERS
GO

