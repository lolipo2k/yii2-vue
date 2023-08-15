<template>
    <div class="card" :class="index == 0 ? 'act' : ''">
        <img :src="cafe.photo" alt="Avatar" style="width:100%">
        <div class="container">
            <h4><b>{{ cafe.name }}</b></h4>
            <p>Адрес: {{ cafe.address }}</p>
            <p>
                Бизнес ланч:
                <span v-if="cafe.business_lunch">
                    Да
                </span>
                <span v-else>
                    Нет
                </span>
            </p>
            <p>Кухня: {{ cafe.cuisine }}</p>
            <p>Расстояние: {{ cafe.distance }} м</p>
            <p>Ориентир: {{ cafe.landmark }}</p>
            <p>Средняя цена: {{ cafe.price }} руб.</p>
            <p>Время: {{ cafe.time }} мин</p>
            <button type="button" class="btn btn-danger" @click="next()">Пропустить</button>
            <div class="comment-add">
                <label for="comment">Комментарий:</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="telegram">
                    <label class="form-check-label" for="flexCheckDefault">
                        Продублировать в телеграм
                    </label>
                </div>
                <textarea class="form-control" rows="5" id="comment" name="text" v-model="message"></textarea>
                <button type="button" class="btn btn-primary mt-3" @click="sendMessage()">Отправить</button>
            </div>

            <div class="media" v-for="message in cartMessages">
                <div class="media-body">
                    <p>{{ message.text }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import api from '../api';

export default {
    name: 'v-cafe-item',
    props: ['index', 'cafe', 'messages'],
    data() {
        return {
            message: '',
            cartMessages: [],
            telegram: false
        }
    },
    methods: {
        next() {
            this.$parent.cafes.shift()
            this.cartMessages = this.messages.filter((item) => item.id_cafe == this.$parent.cafes[0].id);
        },
        sendMessage() {
            api.cafePost('messages', { id_cafe: this.cafe.id, text: this.message });
            if (this.telegram) api.cafePost('telegram', { text: this.message });

            this.cartMessages.unshift({ text: this.message });
            this.message = '';
        }
    },
    watch: {
        messages: {
            handler(val, oldVal) {
                this.cartMessages = this.messages.filter((item) => item.id_cafe == this.$parent.cafes[0].id);
            },
            deep: true
        },
    }
}
</script>