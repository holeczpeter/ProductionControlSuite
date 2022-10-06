namespace Hechinger.FSK.Application.Features
{
    public class GetShift : IRequest<ShiftModel>
    {
        public int Id { get; set; }
        public GetShift(int id) => Id = id;
    }
}
