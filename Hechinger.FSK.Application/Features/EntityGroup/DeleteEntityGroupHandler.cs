namespace Hechinger.FSK.Application.Features
{
    public class DeleteEntityGroupHandler : IRequestHandler<DeleteEntityGroup, Result<bool>>
    {

        private readonly ITreeService treeService;
        public DeleteEntityGroupHandler(FSKDbContext context, ITreeService treeService)
        {

            this.treeService = treeService ?? throw new ArgumentNullException(nameof(treeService));
        }
        public async Task<Result<bool>> Handle(DeleteEntityGroup request, CancellationToken cancellationToken)
        {
            var result = new ResultBuilder<bool>().SetMessage("Sikertelen mentés").SetIsSuccess(false).Build();

            await this.treeService.Delete(request.Id, cancellationToken);

            result.Message = "A hibaösszesítő sikeresen mentve";
            result.IsSuccess = true;
            return result;
        }
    }
}
