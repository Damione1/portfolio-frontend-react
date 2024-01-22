import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Damien Goehrig - Dashboard",
    description: "Dashboard",
};

export default function Home() {
    return (
        <>
            <ECommerce />
        </>
    );
}
