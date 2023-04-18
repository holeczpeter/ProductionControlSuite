namespace ProductionControlSuite.FSK.Application.Common.Models
{
    public class Result<T> : BaseModel
    {
        /// <summary>
        /// Sikeres?
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// Üzenet
        /// </summary>
        public string Message { get; set; }

        
        /// <summary>
        /// Létrehozott entitások
        /// </summary>
        public T Entities { get; set; }

        /// <summary>
        /// Hibák
        /// </summary>
        public List<string> Errors { get; set; } = new List<string>();
        
        /// <summary>
        /// Hiba
        /// </summary>
        public string CurrentError { get; set; }
    }
}
