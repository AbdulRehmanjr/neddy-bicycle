type SelectionProps = {
    startDate: string | undefined
    endDate: string | undefined
    location: 1 | 2 | undefined
    duration: number
    men: number
    ladies: number
    kids: number
    amount: number
    firstName:string
    lastName:string
    email:string
    phone:string
    address:string
}

type GoogleTokenProps = {
    cg_access_token:string
    cg_refresh_token:string
    cg_scope:string
    cg_token_type:string
    cg_expiry_date:number|string
  }