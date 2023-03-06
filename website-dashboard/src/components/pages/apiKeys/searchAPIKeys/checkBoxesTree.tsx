import CheckboxNode from "./checkBoxNode";
import nodes from "./nodeData";

function CheckBoxesTree() {
  return (
    <div className="p-3">
      <dl>
        <dd>
          <div className="border-2 rounded-md">
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
