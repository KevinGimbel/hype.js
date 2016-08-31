;(function (global){
'use strict';
/**
 * Hyperscript Implementation to create nested DOM nodes.
 *
 * Is this a virtual DOM already? Probably not.
 *
 * @author Kevin Gimbel <http://kevingimbel.com>
 */
class Hype {
    constructor() {
        return this;
    }

    typeOf(target, desired) {
        if(!target || !desired) {
            return false;
        }

        return target.constructor.toString().toLowerCase().indexOf(desired) > -1;
    }

    append(childNode, parent) {
        let output = parent;
        if(!parent) {
            output = document.body;
        }

        if( !!this.typeOf(childNode, 'array') ) {
            childNode.forEach( (node) => {
                output.appendChild(node);
            });
        } else {
            output.appendChild(childNode);
        }
    }

    createTags(nodeNameArray) {
        if(!this.typeOf(nodeNameArray, 'array')) {
            return false;
        }
        nodeNameArray.forEach( (node) => {
            global[node] = (...args) => {
                let __hype__ = new Hype();
                return __hype__.hy(node, ...args);
            }
        });
    }

    hy(tagName, ...restArguments) {
        let args = [].slice.call(restArguments);
        let attrs = {};
        let text = undefined;
        let hyNode = [];
        let id = undefined;
        let className = undefined;
        // Read all the args!
        while(args.length) {
            let arg = args.shift();
            
            if(this.typeOf(arg, 'string')) {
              if(arg.match('#') || arg.match('.')) {
                let id = arg.split('#')[1];
                let className = arg.split('.')[1];
              }
            }
            if( this.typeOf(arg, 'string') ) {
                text = arg;
            }

            if( this.typeOf(arg, 'object') ) {
                attrs = arg;
            }

            if( this.typeOf(arg, 'array') ) {
                arg.forEach( (node) => {
                    hyNode.push(node);
                });
            }
        }

        let newDomNode = document.createElement(tagName);

        if(className) {
          newDomNode.setAttribute('class', className);
        }

        if(id) {
          newDomNode.setAttribute('id', id);
        }

        if( this.typeOf(text, 'string') ) {
            newDomNode.innerHTML += text;
        }

        if(attrs) {
            for(var attr in attrs) {
                newDomNode.setAttribute(attr, attrs[attr]);
            }
        }

        newDomNode.setAttribute('is-hy', 'true');

        if( typeof hyNode !== 'undefined' ) {
            if(this.typeOf(hyNode, 'array')) {
                hyNode.forEach( (node) => {
                    newDomNode.appendChild(node);
                });
            }
        }

        return newDomNode;
    }
}
global.Hype = Hype;
}(this));
