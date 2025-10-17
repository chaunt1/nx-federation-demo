# Hướng dẫn chạy ứng dụng Module Federation

## Tổng quan

Dự án này sử dụng Module Federation để kết nối React Host với Angular Remote (Dashboard).

## Cấu trúc

- **Host App** (React): `apps/host` - Ứng dụng chính chạy trên port 4200
- **Dashboard App** (Angular): `apps/dashboard` - Remote module chạy trên port 4201

## Cài đặt

```bash
npm install
```

## Chạy ứng dụng

### Cách 1: Sử dụng script có sẵn

```bash
# Terminal 1 - Chạy Dashboard (Angular Remote)
./run-dashboard.sh

# Terminal 2 - Chạy Host (React)
./run-host.sh
```

### Cách 2: Chạy thủ công với Nx

```bash
# Terminal 1 - Chạy Dashboard
yarn nx serve dashboard

# Terminal 2 - Chạy Host
yarn nx serve host
```

## Truy cập ứng dụng

- Host: http://localhost:4200
- Dashboard Remote: http://localhost:4201

Trên Host app, click vào link "Dashboard" để xem Angular component được load từ remote.

## Cấu hình Module Federation

### Dashboard (Angular Remote)
- **File**: `apps/dashboard/module-federation.config.ts`
- **Exposes**: 
  - `./Module`: React wrapper cho Angular component
  - `./Routes`: Angular routes
- **Remote Entry**: `http://localhost:4201/remoteEntry.mjs`

### Host (React)
- **File**: `apps/host/module-federation.config.ts`
- **Remotes**: 
  - `dashboard`: `http://localhost:4201/remoteEntry.mjs`

## Giải pháp tích hợp React-Angular

Dự án sử dụng một wrapper component (`AngularWrapper`) để mount Angular component vào React app:

1. Angular component được export qua một hàm `mountAngularComponent`
2. React component sử dụng hàm này để bootstrap Angular app trong một DOM element
3. Zone.js được load trong React host để hỗ trợ Angular change detection

## Lưu ý

- Cần chạy cả hai ứng dụng (Dashboard và Host) đồng thời
- Dashboard phải chạy trước Host để remote entry sẵn sàng
- Nếu có lỗi, hãy clear cache và rebuild: `yarn nx reset && yarn nx build dashboard && yarn nx serve dashboard`

