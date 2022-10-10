﻿namespace Hechinger.FSK.Application.Features
{
    public class UserModel : BaseModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public EntityStatuses Status { get; set; }
        public string StatusName { get; set; }
     
    }
}
