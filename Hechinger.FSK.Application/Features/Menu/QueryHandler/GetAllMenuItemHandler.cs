namespace Hechinger.FSK.Application.Features
{
    public class GetAllMenuItemHandler : IRequestHandler<GetAllMenuItem, IEnumerable<MenuItemModel>>
    {
        private readonly FSKDbContext context;
        public GetAllMenuItemHandler(FSKDbContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<MenuItemModel>> Handle(GetAllMenuItem request, CancellationToken cancellationToken)
        {
            //await this.context.Menus.Where(x=>x.EntityStatus == EntityStatuses.Active).Select(x=> new MenuItemModel() 
            //{ 


            //}).ToListAsync();   
            return await Task.Factory.StartNew(() =>
            {
                var menuitems = new List<MenuItemModel>
                {
                    new MenuItemModel
                    {
                        Id = 1, Title = "Hibagyűjtő", Path = "/defect-card", Icon = "description",Type = MenuTypes.Module,
                        Children = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 5, Title = "Hibagyűjtő felvitele", Path = "/defect-card/add", Icon = "edit", Type = MenuTypes.SubMenu  }},
                            { new MenuItemModel { Id = 5, Title = "Hibagyűjtők", Path = "/defect-card/summary-cards", Icon = "list", Type = MenuTypes.SubMenu  }},
                            { new MenuItemModel { Id = 6, Title = "Nyomtatás", Path = "/defect-card/print", Icon = "print", Type = MenuTypes.SubMenu  }},
                        },
                    },
                    new MenuItemModel
                    {
                        Id = 2, Title = "Hibaösszesítő", Path = "/quality-assurance", Icon = "assessment" ,Type = MenuTypes.Module,
                        Children = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 7, Title = "Havi hibaösszesítő", Path = "/quality-assurance/quality-assurance", Icon = "edit", Type = MenuTypes.SubMenu    }},
                        },
                    },
                    new MenuItemModel
                    {
                        Id = 3, Title = "Darabszám jelentés", Path = "/quantity-report", Icon = "assessment" ,Type = MenuTypes.Module,
                        Children = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 8, Title = "Heti darabszám jelentés", Path = "/quantity-report/week", Icon = "edit",  Type = MenuTypes.SubMenu   }},
                            { new MenuItemModel { Id = 9, Title = "Napi darabszám jelentés", Path = "/quantity-report/month", Icon = "print",  Type = MenuTypes.SubMenu   }},
                        },
                    },
                    new MenuItemModel
                                {
                                    Id = 9, Title = "Törzsadatok", Path = "/basic-data", Icon = "list",  Type = MenuTypes.Module,
                                    Children = new List<MenuItemModel>()
                                    {
                                        { new MenuItemModel { Id = 7, Title = "Műszakok", Path = "/basic-data/shift", Icon = "calendar_today", Type = MenuTypes.SubMenu   }},
                                        { new MenuItemModel { Id = 7, Title = "Műhelyek", Path = "/basic-data/workshop", Icon = "group_work", Type = MenuTypes.SubMenu   }},
                                        { new MenuItemModel { Id = 7, Title = "Termékek", Path = "/basic-data/product", Icon = "list", Type = MenuTypes.SubMenu    }},
                                        { new MenuItemModel { Id = 7, Title = "Műveletek", Path = "/basic-data/operation", Icon = "build", Type = MenuTypes.SubMenu    }},
                                        { new MenuItemModel { Id = 7, Title = "Hibák", Path = "/basic-data/defects", Icon = "list", Type = MenuTypes.SubMenu    }},
                                    }
                                },

                    new MenuItemModel
                    {
                                    Id = 9, Title = "Adminisztrátori beállítások", Path = "/admin", Icon = "list",  Type = MenuTypes.Module,
                                    Children = new List<MenuItemModel>()
                                    {
                                        { new MenuItemModel { Id = 7, Title = "Felhasználók", Path = "/admin/users", Icon = "edit", Type = MenuTypes.SubMenu    }},
                                        { new MenuItemModel { Id = 7, Title = "Jogosultságok", Path = "/admin/roles", Icon = "edit", Type = MenuTypes.SubMenu    }},
                                    }
                    },

                     new MenuItemModel
                                {
                                    Id = 8, Title = "Személyes beállítások", Path = "/settings", Icon = "person",  Type = MenuTypes.Module,
                                    Children = new List<MenuItemModel>()
                                    {
                                      { new MenuItemModel { Id = 7, Title = "Nyelvi beállítások", Path = "/settings/language", Icon = "edit", Type = MenuTypes.SubMenu    }},
                                      { new MenuItemModel { Id = 7, Title = "Jelszó beállítása", Path = "/settings/password", Icon = "edit", Type = MenuTypes.SubMenu    }},
                                    }
                                }
                };
                return menuitems.AsEnumerable();
            }, cancellationToken);

        }
    }
}
