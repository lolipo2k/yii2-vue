<template>
    <div>
        <vCafeItem v-for="(cafe, index) in cafes" :index="index" :cafe="cafe" :messages="messages"></vCafeItem>
    </div>
</template>

<script>
import api from '../api';
import vCafeItem from '../components/v-cafe-item.vue';

export default {
    data() {
        return {
            cafes: [],
            messages: []
        }
    },
    components: {
        vCafeItem
    },
    methods: {
        async loadCafes() {
            this.cafes = await api.cafeGet(`https://bandaumnikov.ru/api/test/site/get-index`);
            this.cafes.sort(function () { return 0.5 - Math.random() });
        },
        async loadMessages() {
            this.messages = await api.messagesGet(`messages`);
            this.$emit('setMessages', this.plan)
        },
    },
    async mounted() {
        await this.loadCafes();
        await this.loadMessages();
    }
};
</script>