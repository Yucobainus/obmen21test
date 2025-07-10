// import { useApi } from "#imports";
// import type { Direction, Directions } from "~/types/api";
// const useDirections = () => {
//   const { fetchDirections, fetchToDirection } = useApi();
//   const directions = ref<Directions>([]);
//   const bankDirections = ref<Directions>([]);
//   const fromDirection = ref<number[]>([]);
//   const toDirection = ref<number[]>([]);

//   async function loadDirections() {
//     const data = await fetchDirections();
//     directions.value = data.data.map((direction) => {
//       return { ...direction, isCurrent: false };
//     });
//   }

//   loadDirections();

//   const cryptoDirections = computed(() => {
//     return directions.value.filter(
//       (direction: Direction) => direction.filter[0] === "c"
//     );
//   });

//   watch(fromDirection, async () => {
//     if (fromDirection.value) {
//       const toDirectionsIds = await fetchToDirection(fromDirection.value);
//       if (toDirectionsIds.data) {
//         bankDirections.value = directions.value.filter((direction: Direction) =>
//           toDirectionsIds.data.includes(direction.ids[0])
//         );
//       } else {
//         bankDirections.value = [];
//       }
//     }
//   });

//   return {
//     directions,
//     cryptoDirections,
//     fromDirection,
//     toDirection,
//     bankDirections,
//   };
// };

// export default useDirections;
