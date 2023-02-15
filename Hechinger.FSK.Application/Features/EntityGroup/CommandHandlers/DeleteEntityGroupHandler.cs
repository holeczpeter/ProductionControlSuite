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
            var result = new ResultBuilder<bool>().SetMessage("unsuccessfulSave").SetIsSuccess(false).Build();
            result = await this.treeService.Delete(request.Id, cancellationToken);
            return result;
        }
    }
}
