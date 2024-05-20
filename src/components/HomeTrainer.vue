<template>
    <div>
        <v-row>
            <v-col v-for="col in cols" cols="auto" md="40">
                <v-card>
                    <v-card-title>
                        {{ col.title }}
                    </v-card-title>
                    <v-img width="40em" :src="col.img"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomeTrainer',
    data () {
        return {
            cols: [
                {
                    title: 'Titulo 1',
                    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHLzXUcTa1vjOG9LAvOoD35s9_rbJCZf_V8gK-EwUmA&s'
                },
                {
                    title: 'Titulo 2'
                }
            ],
        }
    },
    methods: {

    }
});
</script>