using Hechinger.FSK.Application.Features.Menu.DTO;
using Hechinger.FSK.Application.Features.Menu.Query;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hechinger.FSK.Application.Features.Menu.QueryHandler
{
    public class GetAllMenuItemHandler : IRequestHandler<GetAllMenuItem, IEnumerable<MenuItemModel>>
    {
        public GetAllMenuItemHandler()
        {
        }
        public async Task<IEnumerable<MenuItemModel>> Handle(GetAllMenuItem request, CancellationToken cancellationToken)
        {
            return await Task.Factory.StartNew(() =>
            {
                var menuitems = new List<MenuItemModel>
                {
                    new MenuItemModel 
                    {
                        Id = 1, Title = "Hibagyűjtő", Route = "", Icon = "description",
                        SubMenuItems = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 5, Title = "Hibagyűjtő", Route = "", Icon = "edit",   }},
                            { new MenuItemModel { Id = 6, Title = "Nyomtatás", Route = "", Icon = "print",   }},
                        },
                    },
                    new MenuItemModel 
                    { 
                        Id = 2, Title = "Hibaösszesítő", Route = "", Icon = "assessment" ,
                        SubMenuItems = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 7, Title = "Havi hibaösszesítő", Route = "", Icon = "edit",   }},
                        },
                    },
                    new MenuItemModel 
                    { 
                        Id = 3, Title = "Darabszám jelentés", Route = "", Icon = "assessment" ,
                        SubMenuItems = new List<MenuItemModel>
                        {
                            { new MenuItemModel { Id = 8, Title = "Heti darabszám jelentés", Route = "", Icon = "edit",   }},
                            { new MenuItemModel { Id = 9, Title = "Napi darabszám jelentés", Route = "", Icon = "print",   }},
                        },
                    },
                    new MenuItemModel 
                    { 
                        Id = 4, Title = "Beállítások", Route = "", Icon = "settings_applications" ,
                        SubMenuItems = new List<MenuItemModel>
                        { 
                            { new MenuItemModel { Id = 8, Title = "Személyes beállítások", Route = "", Icon = "person",   }},
                            { new MenuItemModel { Id = 9, Title = "Adminisztrátori beállítások", Route = "", Icon = "list",   }},
                        },
                    }
                };
                return menuitems.AsEnumerable();
            }, cancellationToken);

        }
    }
}
