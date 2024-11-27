<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Cabeçalho -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-900">{{ currentTitle }}</h1>
        <p class="text-gray-600 mt-2">{{ currentSubtitle }}</p>
      </div>

      <!-- Cartão principal -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <!-- Texto da oração -->
        <div class="mb-8">
          <p class="text-lg text-gray-800 leading-relaxed">
            {{ currentPrayerText }}
          </p>
        </div>

        <!-- Progresso -->
        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{{ currentPrayer }} / {{ totalPrayers }}</span>
          </div>
          <div class="h-2 bg-blue-100 rounded-full">
            <div 
              class="h-full bg-blue-600 rounded-full transition-all duration-300"
              :style="{ width: `${(currentPrayer / totalPrayers) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex justify-between">
          <button
            @click="resetPrayer"
            class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Recomeçar
          </button>
          <button
            @click="nextPrayer"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            :disabled="currentPrayer >= totalPrayers"
          >
            Próximo
          </button>
        </div>
      </div>

      <!-- Navegação -->
      <div class="text-center">
        <router-link 
          to="/" 
          class="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Voltar para o início
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Pray',
  setup() {
    const store = useStore()

    const currentPrayer = computed(() => store.state.currentPrayer)
    const prayerMode = computed(() => store.state.prayerMode)
    const totalPrayers = computed(() => prayerMode.value === 'terco' ? 50 : 200)

    const currentTitle = computed(() => {
      const prayer = currentPrayer.value
      if (prayer === 0) return 'Oferecimento do Rosário'
      if (prayer === 1) return 'Sinal da Cruz'
      if (prayer === 2) return 'Creio em Deus Pai'
      if (prayer === 3) return 'Pai Nosso'
      if (prayer === 4 || prayer === 5 || prayer === 6) return 'Ave Maria'
      if (prayer === 7) return 'Glória ao Pai'
      if ((prayer - 8) % 11 === 0) return 'Pai Nosso'
      if ((prayer - 8) % 11 === 10) return 'Glória ao Pai'
      return 'Ave Maria'
    })

    const currentSubtitle = computed(() => {
      const prayer = currentPrayer.value
      if (prayer === 0) return 'Iniciando nossa oração'
      if (prayer === 1) return 'Em nome do Pai, do Filho e do Espírito Santo'
      if (prayer >= 8) {
        const decade = Math.floor((prayer - 8) / 10) + 1
        return `${decade}º Mistério`
      }
      return 'Preparação'
    })

    const currentPrayerText = computed(() => {
      const prayer = currentPrayer.value
      if (prayer === 0) return store.state.prayers.oferecimento
      if (prayer === 2) return store.state.prayers.creedoPt
      if (prayer === 3 || (prayer - 8) % 11 === 0) return store.state.prayers.paiNosso
      if (prayer === 7 || (prayer - 8) % 11 === 10) return store.state.prayers.gloria
      if (prayer === totalPrayers.value) return store.state.prayers.salveRainha
      return store.state.prayers.aveMaria
    })

    const nextPrayer = () => {
      store.commit('nextPrayer')
    }

    const resetPrayer = () => {
      store.commit('resetPrayer')
    }

    return {
      currentPrayer,
      totalPrayers,
      currentTitle,
      currentSubtitle,
      currentPrayerText,
      nextPrayer,
      resetPrayer
    }
  }
}
</script>
