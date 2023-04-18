namespace ProductionControlSuite.FSK.Application.Features
{
    public class GetAllDefectCategoriesHandler : IRequestHandler<GetAllDefectCategories, IEnumerable<EnumModel>>
    {
        
        public GetAllDefectCategoriesHandler()
        {
        }
        public async Task<IEnumerable<EnumModel>> Handle(GetAllDefectCategories request, CancellationToken cancellationToken)
        {
            return await Task.Factory.StartNew(() =>
            {
                var items = new List<EnumModel>();
                foreach (int item in Enum.GetValues(typeof(DefectCategories)))
                {
                    items.Add(new EnumModel() { Id = item, Name = ((DefectCategories)item).GetDescription() });
                }
                return items;
            }, cancellationToken);

        }
    }
}
