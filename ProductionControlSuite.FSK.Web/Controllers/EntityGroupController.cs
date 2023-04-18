namespace ProductionControlSuite.FSK.Web.Controllers
{
    [Authorize]
    public class EntityGroupController : ControllerBase
    {
        private readonly IMediator mediator;

        public EntityGroupController(IMediator mediator) => this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));


        [HttpPost]
        public async Task<Result<bool>> Save([FromBody] SaveEntityGroup request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpPost]
        public async Task<Result<bool>> Delete([FromBody] DeleteEntityGroup request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<TreeItem<EntityGroupModel>> Get(GetEntityGroupById request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<TreeItem<EntityGroupModel>>> GetAll(GetAllEntityGroups request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        
        [HttpGet]
        public async Task<IEnumerable<EnumModel>> GetGroupTypes(GetGroupTypes request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<EntityGroupRelationTree>> GetEntityRelationsByProducts(GetEntityRelationsByProducts request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<EntityGroupRelationModel>> GetProductsForRelation(GetProductsForRelation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<EntityGroupRelationModel>> GetOperationsForRelation(GetOperationsForRelation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
        [HttpGet]
        public async Task<IEnumerable<EntityGroupRelationModel>> GetDefectsForRelation(GetDefectsForRelation request, CancellationToken cancellationToken)
        {
            return await this.mediator.Send(request, cancellationToken);
        }
    }

}
