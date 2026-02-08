import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class DashboardPage extends BasePage {
  async verifyDashboardLoaded() {
    await expect(this.page.locator(".oxd-userdropdown-tab")).toBeVisible({
      timeout: 15000,
    });
  }

  async goToPIM() {
    await this.page.getByRole("link", { name: "PIM" }).click();
  }
}
