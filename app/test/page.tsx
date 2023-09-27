'use client'

import { Roles } from "@/constants";
import withRole from "@/utils/hocs/withRole"




const Test = () => {
    return (
        <>
            Test
        </>
    )
}

export default withRole(Test, Roles.superadmin);