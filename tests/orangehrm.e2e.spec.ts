import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PIMPage from "../pages/PIMPage";
import LogoutPage from "../pages/LogoutPage";
import { generateEmployee } from "../utils/employeeUtil";

test("Prompt-driven AI generated E2E workflow", async ({ page }) => {
  const employee = generateEmployee();

  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const pim = new PIMPage(page);
  const logout = new LogoutPage(page);

  //Login
  await page.goto("/");
  await login.login("Admin", "admin123");

  //Verify dashboard
  await dashboard.verifyDashboardLoaded();

  //Will navigate to PIM and add employee
  await dashboard.goToPIM();
  await pim.addEmployee(employee.firstName, employee.lastName);

  await dashboard.goToPIM();
  await pim.searchEmployee(employee.firstName);
  await pim.verifyEmployeeExists(employee.firstName);

  //Logout
  await logout.logout();
});
