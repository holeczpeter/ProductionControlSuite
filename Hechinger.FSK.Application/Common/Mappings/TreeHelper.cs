using Hechinger.FSK.Application.Features;

namespace Hechinger.FSK.Application.Common
{
    public static class TreeHelper
    {
        public static IEnumerable<TreeItem<T>> GenerateTree<T, K>(
            this IEnumerable<T> collection,
            Func<T, K> id_selector,
            Func<T, K> parent_id_selector,
            K root_id = default(K))
        {
            foreach (var c in collection.Where(c => parent_id_selector(c).Equals(root_id)))
            {
                yield return new TreeItem<T>
                {
                    Node = c,
                    Children = collection.GenerateTree(id_selector, parent_id_selector, id_selector(c)),
                    Collapsed = false
                };
            }
        }

        public static IEnumerable<TreeItem<EntityGroupRelation>> GenerateTreeExtension<T, K>(
            this IEnumerable<EntityGroupRelation> collection,
            Func<EntityGroupRelation, K> id_selector,
            Func<EntityGroupRelation, K> parent_id_selector,
            K root_id = default(K))
        {
            foreach (var c in collection.Where(c => parent_id_selector(c).Equals(root_id) && c.EntityType == EntityTypes.Product))
            {
                yield return new TreeItem<EntityGroupRelation>
                {
                    Node = c,
                    Children = collection.GenerateTree(id_selector, parent_id_selector, id_selector(c)),
                    Collapsed = false
                };
            }
        }
        public static IEnumerable<T> SelectNestedChildren<T>
                (this IEnumerable<T> source, Func<T, IEnumerable<T>> selector)
        {
            foreach (T item in source)
            {
                yield return item;
                foreach (T subItem in SelectNestedChildren(selector(item), selector))
                {
                    yield return subItem;
                }
            }
        }
        public static TreeItem<EntityGroupModel> FindNode(TreeItem<EntityGroupModel> treeItem, int id)
        {
            if (treeItem.Node.Id == id) return treeItem;  
            else
            {
                foreach (var item in treeItem.Children)
                {
                    TreeItem<EntityGroupModel> result = FindNode(item, id);
                    if (result != null) return result;
                }
                
            }
            return null;
        }
        public static TreeItem<EntityGroupModel> Find(TreeItem<EntityGroupModel> treeItem, int id) 
        { 

            if (treeItem.Node.Id == id) return treeItem;
            else if (treeItem.Children != null && treeItem.Children.Any()) 
            {
                var result = false;
                foreach (var item in treeItem.Children)
                {
                    return Find(item, id);
                }
               
            }
            return null;
        }
        
    }
}
