// 参照这个结构
// const state = {
// visibilityFilter: 'SHOW_ALL',
//     todo: [
//     {
//         text: 'Build my first Redux app',
//         completed: true,
//     },
//     {
//         text: 'call my friend',
//         completed: false,
//     },
// ],
// };

// 经过分析，我们需要3种类型的操作。
// const ADD_TODO = 'ADD_TODO';
// const TOGGLE_TODO = 'TOGGLE_TODO';
// const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
//
// // 所以有3个aciton creator
// function addTodo(text) {
//     return {
//         type: ADD_TODO,
//         text,
//     }
// }
//
// function toggleTodo(index) {
//     return {
//         type: TOGGLE_TODO,
//         index,
//     }
// }
//
// function setVisbilityFilter(filter) {
//     return {
//         type: SET_VISIBILITY_FILTE,
//         filter,
//     }
// }
//
// // 把setVisbilityFilter中能用的filter用常量抽出来
// // 调用的时候这样 store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
// const visbilityFilter = {
//     SHOW_ALL: 'SHOW_ALL',
//     SHOW_COMPLETED: 'SHOW_COMPLETED',
//     SHOW_ACTIVE: 'SHOW_ACTIVE',
// };

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * 其它的常量
 */

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE',
};

/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: ADD_TODO, text };
}

export function toggleTodo(index) {
    return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter };
}
