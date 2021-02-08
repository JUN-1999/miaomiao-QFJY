<template>
	<div class="city_body">
		<div class="city_list">
			<Loading v-if="isloading" />
			<Scroller v-else ref="city_list">
				<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li
								@tap="handleToCity(data.name, data.cityId)"
								v-for="data in hotlist"
								:key="data.cityId"
							>
								{{ data.name }}
							</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="data in datalist" :key="data.index">
							<h2>{{ data.index }}</h2>
							<ul>
								<li
									@tap="handleToCity(datalist.name, datalist.cityId)"
									v-for="datalist in data.list"
									:key="datalist.cityId"
								>
									{{ datalist.name }}
								</li>
							</ul>
						</div>
					</div>
					<div class="city_index">
						<ul>
							<li
								@touchstart="handleToIndex(index)"
								v-for="(data, index) in datalist"
								:key="data.index"
							>
								{{ data.index }}
							</li>
						</ul>
					</div>
				</div>
			</Scroller>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "city",
	data() {
		return {
			datalist: [],
			hotlist: [],
			isloading: true
		};
	},
	mounted() {
		var datalist = window.localStorage.getItem("datalist");
		var hotlist = window.localStorage.getItem("hotlist");

		if (datalist && hotlist) {
			this.datalist = JSON.parse(datalist);
			this.hotlist = JSON.parse(hotlist);
			this.isloading = false;
		} else {
			axios({
				url: "https://m.maizuo.com/gateway?k=9502566",
				headers: {
					"X-Client-Info":
						'{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
					"X-Host": "mall.film-ticket.city.list"
				}
			}).then(res => {
				this.datalist = this.handleCity(res.data.data.cities);
				this.hotlist = this.handleHotCity(res.data.data.cities);
				this.isloading = false;
				window.localStorage.setItem("datalist", JSON.stringify(this.datalist));
				window.localStorage.setItem("hotlist", JSON.stringify(this.hotlist));
			});
		}
	},
	methods: {
		handleCity(data) {
			var letterArr = [];
			for (let i = 65; i < 91; i++) {
				letterArr.push(String.fromCharCode(i));
			}
			const newlist = [];
			for (let j = 0; j < letterArr.length; j++) {
				const arr = data.filter(
					item => item.pinyin.substring(0, 1) === letterArr[j].toLowerCase()
				);
				if (arr.length > 0) {
					newlist.push({
						index: letterArr[j],
						list: arr
					});
				}
			}
			return newlist;
		},
		handleHotCity(data) {
			let hotlist = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].isHot === 1) {
					hotlist.push(data[i]);
				}
			}
			return hotlist;
		},
		handleToIndex(index) {
			var h2 = this.$refs.city_sort.getElementsByTagName("h2");
			// this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
			this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
		},
		handleToCity(nm, id) {
			this.$store.commit("city/CITY_INFO", { nm, id });
			window.localStorage.setItem("nowNm", nm);
			window.localStorage.setItem("nowId", id);

			this.$router.push("/movie/nowplaying");
		}
	}
};
</script>

<style scoped>
#content .city_body {
	margin-top: 45px;
	display: flex;
	width: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
}
.city_body .city_list {
	flex: 1;
	overflow: auto;
	background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
	background-color: transparent;
	width: 0;
}
.city_body .city_hot {
	margin-top: 20px;
}
.city_body .city_hot h2 {
	padding-left: 15px;
	line-height: 30px;
	font-size: 14px;
	background: #f0f0f0;
	font-weight: normal;
}
.city_body .city_hot ul li {
	float: left;
	background: #fff;
	width: 29%;
	height: 33px;
	margin-top: 15px;
	margin-left: 3%;
	padding: 0 4px;
	border: 1px solid #e6e6e6;
	border-radius: 3px;
	line-height: 33px;
	text-align: center;
	box-sizing: border-box;
}
.city_body .city_sort div {
	margin-top: 20px;
}
.city_body .city_sort h2 {
	padding-left: 15px;
	line-height: 30px;
	font-size: 14px;
	background: #f0f0f0;
	font-weight: normal;
}
.city_body .city_sort ul {
	padding-left: 10px;
	margin-top: 10px;
}
.city_body .city_sort ul li {
	line-height: 30px;
	line-height: 30px;
}
.city_body .city_index {
	width: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	border-left: 1px #e6e6e6 solid;
}
</style>
