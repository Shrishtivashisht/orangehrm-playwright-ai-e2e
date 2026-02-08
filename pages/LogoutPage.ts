import BasePage from "./BasePage";
import { expect } from "@playwright/test";

export default class LogoutPage extends BasePage {
  async logout() {
    await this.page.locator(".oxd-userdropdown-tab").click();

    await this.page.locator('a[href*="auth/logout"]').click();

    await expect(
      this.page.getByRole("heading", { name: "Login" }),
    ).toBeVisible();
  }
}
