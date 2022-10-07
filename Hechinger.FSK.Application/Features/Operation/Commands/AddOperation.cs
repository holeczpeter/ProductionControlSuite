﻿namespace Hechinger.FSK.Application.Features
{
    public class AddOperation : IRequest<Result<bool>>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public string TranslatedName { get; set; }
        [Required]
        public int ProductId { get; set; }
        public double OperationTime { get; set; }
        public double Norma { get; set; }

    }
}
