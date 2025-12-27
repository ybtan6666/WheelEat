# Spin Logs Database Integration

## Current Status ✅

**Spin logs ARE being saved to D1 database!**

Every time a user spins the wheel, the following data is automatically saved to the `spin_logs` table:

- `id` - Unique spin log ID
- `restaurant_name` - Name of the selected restaurant
- `restaurant_unit` - Unit number (e.g., "F-123")
- `restaurant_floor` - Floor level
- `category` - Restaurant category
- `dietary_need` - User's dietary preference
- `timestamp` - When the spin occurred
- `mall_id` - Which mall was selected
- `selected_categories` - JSON array of all selected categories
- `created_at` - When the record was created

---

## What's Missing ❌

**Spin logs are NOT currently linked to users:**
- Guest users and Google users both create spin logs
- But there's no `user_id` field to track which user made which spin
- You can't see a user's spin history

---

## How to View Spin Logs

### Method 1: D1 Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **D1**
3. Click on your database (`wheeleat-db`)
4. Go to **"Data"** tab
5. Select **"spin_logs"** table
6. You'll see all spin logs with all the data

### Method 2: SQL Query

In D1 SQL Editor, run:
```sql
SELECT * FROM spin_logs ORDER BY timestamp DESC LIMIT 10;
```

### Method 3: API Endpoint (Coming Soon)

We can create `/api/spin-logs` endpoint to view logs programmatically.

---

## Testing Spin Logs

1. **Spin the wheel** in your app
2. **Check D1 dashboard** → `spin_logs` table
3. You should see a new row with:
   - Restaurant name
   - Category
   - Mall ID
   - Timestamp
   - Selected categories (as JSON text)

---

## Future Enhancement: Link to Users

To track which user made which spin, we can:

1. **Add `user_id` column** to `spin_logs` table
2. **Send `user_id`** from frontend when spinning
3. **Create `/api/my-spins`** endpoint to view user's spin history

This would allow:
- Users to see their own spin history
- Analytics on which users spin most
- Personalization features

---

## Current Data Flow

```
User Spins Wheel
      ↓
POST /api/spin
      ↓
Random Restaurant Selected
      ↓
INSERT INTO spin_logs (restaurant_name, category, ...)
      ↓
D1 Database (spin_logs table)
```

---

## Example Spin Log Data

When you view the `spin_logs` table, you'll see rows like:

| id | restaurant_name | category | mall_id | timestamp | selected_categories |
|---|---|---|---|---|---|
| spin-123 | KFC | Fast Food | sunway_square | 1735315200 | ["Fast Food", "Western"] |
| spin-456 | McDonald's | Fast Food | sunway_square | 1735315300 | ["Fast Food"] |

---

## Troubleshooting

### No spin logs appearing?

1. **Check that you've spun the wheel** (not just viewed the page)
2. **Check D1 dashboard** - verify `spin_logs` table exists
3. **Check browser console** - look for errors when spinning
4. **Check Cloudflare Pages logs** - verify `/api/spin` endpoint is working

### Spin logs not saving?

- The code continues even if database insert fails (to not break the user experience)
- Check Cloudflare Pages Function logs for database errors
- Verify D1 binding is configured correctly

---

## Summary

✅ **Spin logs ARE being saved** - Every spin is logged to D1
❌ **Not linked to users** - Can't track which user made which spin (yet)
✅ **All spin data is saved** - Restaurant, category, mall, timestamp, etc.

