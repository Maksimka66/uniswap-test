import * as yup from 'yup'

export const swapSchema = yup.object().shape({
    sell: yup.string().trim().required('Enter your amount!')
})

