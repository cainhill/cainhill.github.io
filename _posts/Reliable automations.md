## 🟢 Tier A
Tier A requires careful planning to improve the reliability and maintainability of your automations. These checks often require structural changes.

## 🟠 Tier B
Tier B automations have achieved some basic standards. You can get to Tier B quickly with small changes to your automations.

**Error Management**
This workflow has an Error Workflow selected in its settings so that unexpected runtime failure automatically trigger immediate team notifications and telemetry.

**Meaningful Node Naming**
This workflow uses customised, meaningful names for every node. Always starting with a verb and an object noun (e.g., `Fetch_Employee_Record` instead of `HTTP Request`) so it is more easily managed without specialist knowledge.

**Meaningful Workflow Naming**
This workflow name begins with a standard functional prefix emoji, such as ⏰ for scheduled automations, 🛜 for webhooks triggers, or 📦 for dedicated sub-workflows. This makes its trigger method visible at a glance from the main workflows list.

## 🔴 Tier C
Tier C workflows have not been properly assessed and should not be trusted as reliable.