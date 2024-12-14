<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-blue-900 mb-2">Santo Terço</h1>
        <p class="text-gray-600">Reze o terço com devoção</p>
      </div>

      <!-- Mistérios do dia -->
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold text-blue-900 mb-4">{{ todaysMysteries.name }}</h2>
        <ul class="space-y-2">
          <li v-for="(mystery, index) in todaysMysteries.mysteries" :key="index" class="text-gray-700">
            {{ index + 1 }}º Mistério: {{ mystery }}
          </li>
        </ul>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-blue-900 mb-6">Começar a Rezar</h2>
        
        <div class="mt-8 text-center">
          <router-link 
            to="/pray" 
            class="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar o Terço
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'Home',
  setup() {
    const mysteries = {
      gozosos: {
        name: 'Mistérios Gozosos',
        mysteries: [
          'A Anunciação do Anjo a Nossa Senhora',
          'A Visitação de Nossa Senhora a sua prima Isabel',
          'O Nascimento de Jesus',
          'A Apresentação do Menino Jesus no Templo',
          'O Encontro do Menino Jesus no Templo'
        ]
      },
      dolorosos: {
        name: 'Mistérios Dolorosos',
        mysteries: [
          'A Agonia de Jesus no Horto',
          'A Flagelação de Jesus',
          'A Coroação de Espinhos',
          'Jesus carrega a Cruz',
          'A Crucificação e Morte de Jesus'
        ]
      },
      gloriosos: {
        name: 'Mistérios Gloriosos',
        mysteries: [
          'A Ressurreição de Jesus',
          'A Ascensão de Jesus ao Céu',
          'A Vinda do Espírito Santo',
          'A Assunção de Nossa Senhora',
          'A Coroação de Nossa Senhora'
        ]
      },
      luminosos: {
        name: 'Mistérios Luminosos',
        mysteries: [
          'O Batismo de Jesus no Rio Jordão',
          'A Autorrevelação de Jesus nas Bodas de Caná',
          'O Anúncio do Reino de Deus',
          'A Transfiguração',
          'A Instituição da Eucaristia'
        ]
      }
    }

    const getCurrentMysteryType = () => {
      const date = new Date()
      const day = date.getDay()
      
      switch(day) {
        case 0: // Domingo
        case 3: // Quarta
          return mysteries.gloriosos
        case 1: // Segunda
        case 6: // Sábado
          return mysteries.gozosos
        case 2: // Terça
        case 5: // Sexta
          return mysteries.dolorosos
        case 4: // Quinta
          return mysteries.luminosos
        default:
          return mysteries.gozosos
      }
    }

    const todaysMysteries = computed(() => getCurrentMysteryType())

    return {
      todaysMysteries
    }
  }
}
</script>
