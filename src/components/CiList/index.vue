<template>
	<div class="cinema_body">
		<Loading v-if="isloading" />
		<Scroller v-else>
			<ul>
				<!-- <li>
				<div>
					<span>大地影院(澳东世纪店)</span>
					<span class="q"><span class="price">22.9</span> 元起</span>
				</div>
				<div class="address">
					<span>金州区大连经济技术开发区澳东世纪3层</span>
					<span>1763.5km</span>
				</div>
				<div class="card">
					<div>小吃</div>
					<div>折扣卡</div>
				</div>
			</li> -->
				<li v-for="data in cinemaList" :key="data.id">
					<div>
						<span>{{ data.nm }}</span>
						<span class="q"
							><span class="price">{{ data.sellPrice }}</span> 元起</span
						>
					</div>
					<div class="address">
						<span>{{ data.addr }}</span>
						<span>{{ data.distance }}</span>
					</div>
					<div class="card">
						<div
							v-for="(itemCard, index) in data.tag"
							v-if="itemCard === 1"
							:key="index"
							:class="index | classCard"
						>
							{{ index | formatCard }}
						</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "CiList",
	data() {
		return {
			cinemaList: [],
			isloading: true,
			prevCityId: -1
		};
	},
	activated() {
		let cityId = this.$store.state.city.id;
		if (this.prevCityId === cityId) {
			return;
		}
		this.isLoading = true;

		axios.get("/ajax/cinemaList?cityId=1").then(res => {
			this.cinemaList = res.data.cinemas;
			this.isloading = false;
			this.prevCityId = cityId;
		});
	},
	filters: {
		formatCard(index) {
			var card = [
				{
					index: "allowRefund",
					value: "改签"
				},
				{
					index: "endorse",
					value: "退"
				},
				{
					index: "sell",
					value: "折扣卡"
				},
				{
					index: "snack",
					value: "小吃"
				}
			];
			for (var i = 0; i < card.length; i++) {
				if (card[i].index === index) {
					return card[i].value;
				}
			}
			return "";
		},
		classCard(index) {
			var card = [
				{
					index: "allowRefund",
					value: "bl"
				},
				{
					index: "endorse",
					value: "bl"
				},
				{
					index: "sell",
					value: "or"
				},
				{
					index: "snack",
					value: "or"
				}
			];
			for (var i = 0; i < card.length; i++) {
				if (card[i].index === index) {
					return card[i].value;
				}
			}
			return "";
		}
	}
};
</script>

<style scoped>
#content .cinema_body {
	flex: 1;
	overflow: auto;
}
.cinema_body ul {
	padding: 20px;
}
.cinema_body li {
	border-bottom: 1px solid #e6e6e6;
	margin-bottom: 20px;
}
.cinema_body div {
	margin-bottom: 10px;
}
.cinema_body .q {
	font-size: 11px;
	color: #f03d37;
}
.cinema_body .price {
	font-size: 18px;
}
.cinema_body .address {
	font-size: 13px;
	color: #666;
}
.cinema_body .address span:nth-of-type(2) {
	float: right;
}
.cinema_body .card {
	display: flex;
}
.cinema_body .card div {
	padding: 0 3px;
	height: 15px;
	line-height: 15px;
	border-radius: 2px;
	color: #f90;
	border: 1px solid #f90;
	font-size: 13px;
	margin-right: 5px;
}
.cinema_body .card div.or {
	color: #f90;
	border: 1px solid #f90;
}
.cinema_body .card div.bl {
	color: #589daf;
	border: 1px solid #589daf;
}
</style>
