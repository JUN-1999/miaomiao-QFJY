const state = {
	nm: window.localStorage.getItem("nowNm") | "北京",
	id: window.localStorage.getItem("nowId") | "1"
};
const actions = {};
const mutations = {
	CITY_INFO(state, payload) {
		state.nm = payload.nm;
		state.id = payload.id;
	}
};

export default {
	namespaced: true, //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
	state,
	actions,
	mutations
};
