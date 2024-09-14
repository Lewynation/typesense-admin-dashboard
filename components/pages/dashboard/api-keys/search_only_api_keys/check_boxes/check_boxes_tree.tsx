import CheckboxNode from "./check_boxes_node";
import nodes from "./node_data";

function CheckBoxesTree() {
  return (
    <div className="p-3">
      <dl>
        <dd>
          <div className="border-2 rounded-md dark:border-gray-600">
            <ul>
              {nodes.map((node) => {
                return (
                  <CheckboxNode
                    key={node.value}
                    parentDescription={node.parentDescription}
                    parentLabel={node.label}
                    childrenNodes={node.children}
                  />
                );
              })}
            </ul>
          </div>
        </dd>
      </dl>
    </div>
  );
}

export default CheckBoxesTree;
