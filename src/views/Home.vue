<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-blue-900 mb-8">Rosário Virtual</h1>
        
        <!-- Seleção do modo de oração -->
        <div class="mb-12 bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Escolha o modo de oração</h2>
          <div class="space-y-4">
            <button 
              @click="selectMode('terco')" 
              class="w-full p-4 text-left rounded-lg border-2 transition-all"
              :class="{'border-blue-500 bg-blue-50': prayerMode === 'terco', 'border-gray-200 hover:border-blue-300': prayerMode !== 'terco'}"
            >
              <h3 class="font-medium text-lg text-blue-900">Terço</h3>
              <p class="text-sm text-gray-600">Uma parte do rosário (50 Ave-Marias)</p>
            </button>
            
            <button 
              @click="selectMode('rosario')" 
              class="w-full p-4 text-left rounded-lg border-2 transition-all"
              :class="{'border-blue-500 bg-blue-50': prayerMode === 'rosario', 'border-gray-200 hover:border-blue-300': prayerMode !== 'rosario'}"
            >
              <h3 class="font-medium text-lg text-blue-900">Rosário Completo</h3>
              <p class="text-sm text-gray-600">Rosário completo (200 Ave-Marias)</p>
            </button>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-blue-800 mb-6">Mistérios de Hoje</h2>
        
        <!-- Cards dos mistérios -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(mystery, index) in mysteries" :key="index" class="bg-white rounded-xl shadow-lg p-6 transition-transform duration-200 hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-blue-900 mb-3">{{ mystery.name }}</h3>
            <div class="text-sm text-gray-600 mb-4">
              {{ mystery.days.join(', ') }}
            </div>
            <ul class="text-left space-y-2">
              <li v-for="(m, mIndex) in mystery.mysteries" :key="mIndex" class="flex items-start">
                <span class="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center mr-2 mt-0.5">
                  {{ mIndex + 1 }}
                </span>
                <span class="text-gray-700">{{ m }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Botão de início -->
        <div class="mt-12">
          <router-link 
            to="/rezar" 
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
          >
            Começar a Rezar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    
    const mysteries = computed(() => store.state.mysteries)
    const prayerMode = computed(() => store.state.prayerMode)

    const selectMode = (mode) => {
      store.commit('setPrayerMode', mode)
    }

    return {
      mysteries,
      prayerMode,
      selectMode
    }
  }
}
</script>
