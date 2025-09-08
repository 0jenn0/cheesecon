'use client';

import { RuntimeLoader } from '@rive-app/react-webgl2';

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
RuntimeLoader.setWasmUrl(`${base}/vendor/rive/rive.wasm`);
