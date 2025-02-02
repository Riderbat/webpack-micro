import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin(): PluginItem{
    return{
        visitor: {
            Program(path, state){
                const forProps = state.opts.props || []

                path.traverse({
                    JSXIdentifier(current){
                        const nodeName = current.node.name
                        if(forProps.includes(nodeName)){
                            current.parentPath.remove()
                        }
                    }
                })
            }
        }
    }
}