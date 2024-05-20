<template>
    <div>
        User Profile
        <div>
            {{  sessionFetching  }}
        </div>
    </div>
</template>

<script lang="ts">
    import { useSessionStore } from '@/stores/session/session.store';
import { mapState } from 'pinia';

import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'UserProfile',
        computed: {
            ...mapState(useSessionStore, [ 'sessionFetching' ]),
        }
    });
</script>