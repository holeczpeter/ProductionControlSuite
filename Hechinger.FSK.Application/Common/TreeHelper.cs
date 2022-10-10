﻿namespace Hechinger.FSK.Application.Common
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
    }
}
