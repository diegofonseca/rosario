<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <img class="h-8 w-8" src="/rosary.svg" alt="Logo" />
              <span class="ml-2 text-xl font-semibold text-gray-900">Rosário Virtual</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600"
            >
              Início
            </router-link>
            <router-link 
              to="/rezar" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-blue-600"
            >
              Rezar
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <slot></slot>
    </main>

    <footer class="bg-white mt-12">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-600">Feito com ❤️ por Diego da Fonseca</p>
        <p class="text-xs mt-1 text-gray-500">Usando Windsurf com Claude 3.5 Sonnet</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>
