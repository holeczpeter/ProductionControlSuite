namespace Hechinger.FSK.Application.Features
{
    internal class CreateEntityGroupHandler : IRequestHandler<CreateEntityGroup, Result<bool>>
    {

        private readonly ITreeService treeService;
        public CreateEntityGroupHandler(FSKDbContext context, ITreeService treeService)
        {

            this.treeService = treeService ?? throw new ArgumentNullException(nameof(treeService));
        }
        public async Task<Result<bool>> Handle(CreateEntityGroup request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            await this.treeService.CreateRelations(request.Current, null, cancellationToken);

            result.Message = "A hibaösszesítő sikeresen mentve";
            result.IsSuccess = true;
            return result;
        }
    }
}
