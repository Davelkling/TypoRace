<script setup lang="ts">
const API = useRuntimeConfig().public.API;
const { data: users } = await useFetch<[userObj]>(`${API}/user`);
export interface userObj {
  id: number;
  name: string;
}

console.log(API, users.value);
</script>

<template>
  <div class="bg-[#111419]">
    <div class="mr-60 ml-60 h-screen pt-8 pb-8 p-4">
      <div class="flex flex-col mr-10 ml-10 gap-8 h-full">
        <Header />
        <TextBox />
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
