namespace Hechinger.FSK.Application.Features
{
    public class GetGroupTypeHandler : IRequestHandler<GetGroupTypes, IEnumerable<EnumModel>>
    {
        public GetGroupTypeHandler()
        {
            
        }
        public async Task<IEnumerable<EnumModel>> Handle(GetGroupTypes request, CancellationToken cancellationToken)
        {
            return await Task.Factory.StartNew(() =>
            {
                var items = new List<EnumModel>();
                foreach (int item in Enum.GetValues(typeof(GroupTypes)))
                {
                    items.Add(new EnumModel() { Id = item, Name = ((GroupTypes)item).GetDescription() });
                }
                return request.IsAll ? items : items.Where(x=>x.Id == 0 || x.Id == 1);
            }, cancellationToken);

        }
    }
}
