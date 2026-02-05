// export async function getPoolImmutables(poolContract) {
//     const [token0, token1, fee] = await Promise.all([
//         poolContract.token0,
//         poolContract.token1,
//         poolContract.fee
//     ])

//     return {
//         token0,
//         token1,
//         fee
//     }
// }

// export async function getPoolState(poolContract) {
//     const slot = await poolContract.slot0()

//     console.log(slot)

//     return {
//         sqrtPrice96: slot[0]
//     }
// }

