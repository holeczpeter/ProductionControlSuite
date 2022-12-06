using Hechinger.FSK.Application.Common.Models;
using Hechinger.FSK.Application.Features;
using Hechinger.FSK.Infrastructure.Persistence;
using NUnit.Framework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Test
{
    public class SaveTreeTest
    {
        private ITreeService treeService;
        [SetUp]
        public void Setup()
        {
            var factory = new FSKDbContextFactory();
            var dbContext = factory.CreateDbContext(new string[0]);
            this.treeService = new TreeService(dbContext);


        }
        [Test]
        public async Task Save()
        {
            //var tree = new TreeItem<EntityGroupModel>();
            //tree = new TreeItem<EntityGroupModel>()
            //{

            //    Name = "Második csoport",
            //    TranslatedName = "Második hibaösszesítő csoport",
            //    GroupType = 0,
            //};

            //tree.Children = new List<SaveEntityGroup>()
            //{
            //    new SaveEntityGroup()
            //    {
            //        Name = "Második hibaösszesítő alcsoport",
            //        TranslatedName = "Second hibaösszesítő alcsoport",
            //        GroupType = 0,
            //        Children = new List<SaveEntityGroup>()
            //        {
            //                new SaveEntityGroup()
            //            {
            //                 Name = "Második hibaösszesítő alcsoport 2",
            //                    TranslatedName = "Second hibaösszesítő alcsoport 2",
            //                    GroupType = 0,
            //                Children = new List<SaveEntityGroup>()
            //                {
            //                     new SaveEntityGroup()
            //                        {
            //                            Name = "Második hibaösszesítő",
            //                                TranslatedName = "First hibaösszesítő",
            //                                GroupType = Core.Enums.GroupTypes.Head,
            //                            Children = new List<SaveEntityGroup>()
            //                            {
            //                                        new SaveEntityGroup()
            //                                        {
            //                                           Name = "421129A_421082A",
            //                                                TranslatedName = "First termékcsoport",
            //                                                GroupType = Core.Enums.GroupTypes.Item,
            //                                                Relations = new List<EntityGroupRelationModel>()
            //                                                {
            //                                                    new EntityGroupRelationModel {

            //                                                        EntityId = 89,
            //                                                        EntityType = Core.Enums.EntityTypes.Product,
            //                                                    },
            //                                                     new EntityGroupRelationModel {
            //                                                        EntityId = 90,
            //                                                        EntityType = Core.Enums.EntityTypes.Product,
            //                                                    }
            //                                                },
            //                                            Children = new List<SaveEntityGroup>()
            //                                            {
            //                                                new SaveEntityGroup()
            //                                                {
            //                                                    Name = "421129A18_ 421082A18",
            //                                                        TranslatedName = "First múveletcsoport",
            //                                                         GroupType = Core.Enums.GroupTypes.Item,
            //                                                        Relations = new List<EntityGroupRelationModel>()
            //                                                        {
            //                                                            new EntityGroupRelationModel {

            //                                                                EntityId = 2779,
            //                                                                EntityType = Core.Enums.EntityTypes.Operation,
            //                                                            },
            //                                                             new EntityGroupRelationModel {

            //                                                                EntityId = 2786,
            //                                                                EntityType = Core.Enums.EntityTypes.Operation,
            //                                                            }
            //                                                        },
            //                                                    Children = new List<SaveEntityGroup>()
            //                                                    {
            //                                                        new SaveEntityGroup()
            //                                                        {
                                                                       
            //                                                             Name = "421129A1801_421082A1801",
            //                                                                TranslatedName = "First hibacsoport",
            //                                                                 GroupType = Core.Enums.GroupTypes.Item,
            //                                                                Relations = new List<EntityGroupRelationModel>()
            //                                                                {
            //                                                                    new EntityGroupRelationModel {
            //                                                                        EntityId = 7096,
            //                                                                        EntityType = Core.Enums.EntityTypes.Defect,
            //                                                                    },
            //                                                                     new EntityGroupRelationModel {
            //                                                                        EntityId = 7060,
            //                                                                        EntityType = Core.Enums.EntityTypes.Defect,
            //                                                                    }
            //                                                                },
            //                                                            Children = new List<SaveEntityGroup>()


            //                                                        },

            //                                                    },

            //                                                },

            //                                            }

            //                                        },

            //                                    }

            //                                 },
            //                                new SaveEntityGroup()
            //                                {
            //                                    Name = "Második hibaösszesítő",
            //                                        TranslatedName = "Second hibaösszesítő",
            //                                         GroupType = Core.Enums.GroupTypes.Head,
            //                                }
            //                                            }
            //                                        },
            //                                    }
            //                                },

            //};

            //var result = await this.treeService.Save(tree, null, new System.Threading.CancellationToken());
        }

       
    }
}
