namespace ProductionControlSuite.FSK.Application.Features
{
    public class SaveEntityGroupHandler : IRequestHandler<SaveEntityGroup, Result<bool>>
    {

        private readonly ITreeService treeService;
        public SaveEntityGroupHandler(FSKDbContext context, ITreeService treeService)
        {

            this.treeService = treeService ?? throw new ArgumentNullException(nameof(treeService));
        }
        public async Task<Result<bool>> Handle(SaveEntityGroup request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            result = await this.treeService.Save(request.Current, null, cancellationToken);
            return result;
        }
    }
}

