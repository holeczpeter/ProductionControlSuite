using Hechinger.FSK.Core.Common;

namespace Hechinger.FSK.Application.Features
{
    public class EntityGroupRelationModel: BaseModel
    {
        public int Id { get; set; }

        public int EntityGroupId { get; set; }
        public int EntityId { get; set; }
        public EntityTypes EntityType { get; set; }
    }
}
