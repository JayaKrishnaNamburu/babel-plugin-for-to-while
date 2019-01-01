import * as babylon from "babylon";
import * as types from "@babel/types";
import template from "@babel/template";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const buildWhileBlock = template(`
  if(ARGS)
  BLOCKDATA
  else {
    console.log('condition failed');
  }
`);

const code = `
  while (abc > b) {
    console.log('a is greater than b');
  }
`;

const ast = babylon.parse(code, { sourceType: "module" });

traverse(ast, {
  WhileStatement(path) {
    const ast = buildWhileBlock({
      ARGS: types.binaryExpression(
        path.node.test.operator,
        path.node.test.left,
        path.node.test.right
      ),
      BLOCKDATA: path.node.body
    });
    console.log(generate(ast).code);
  }
});
