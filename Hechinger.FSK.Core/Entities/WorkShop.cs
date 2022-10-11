﻿namespace Hechinger.FSK.Core.Entities
{
    public class WorkShop : Entity
    {
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; } = new HashSet<Product>();
        public virtual ICollection<WorkShopUser> Users { get; set; } = new HashSet<WorkShopUser>();
    }
}
