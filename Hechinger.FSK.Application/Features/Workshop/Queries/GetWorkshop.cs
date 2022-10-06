﻿namespace Hechinger.FSK.Application.Features
{
    public class GetWorkshop : IRequest<WorkshopModel>
    {
        public GetWorkshop(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
    }
}