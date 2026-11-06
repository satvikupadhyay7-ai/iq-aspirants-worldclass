# IQ Aspirants 2.0

A Next.js student workspace starter with Supabase authentication, protected feature routes, a focus-room experience, and Cloudinary-hosted profile photos.

## Requirements
- Node.js 20.9+
- npm
- A Supabase project
- A Cloudinary account for profile-photo uploads

## Run locally
1. Extract the ZIP and open the `iq-aspirants-2` folder in VS Code.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase project URL and publishable/anon key.
5. Add your Cloudinary cloud name, API key and API secret. The API secret must remain server-side; do not prefix it with `NEXT_PUBLIC_`.
6. Run `npm run dev` and visit http://localhost:3000.

## Authentication and feature access
- Feature cards on the landing page lead to sign-in.
- Workspace routes check the current Supabase session and redirect logged-out visitors to sign-in, preserving the requested destination.
- After sign-in, the user is returned to the requested feature (or the dashboard).
- The navigation changes from **Sign in** to **Sign out** when a session is active.
- New registrations use the `student` user metadata role. Supabase email-confirmation settings still determine whether a new account receives a session immediately.

## Cloudinary profile photos
The profile page requests a short-lived signed upload payload from `/api/cloudinary/signature`. The server validates the Supabase access token, scopes the upload folder to that user's ID, and signs the request with the server-only Cloudinary API secret. The browser uploads directly to Cloudinary and stores the returned secure URL in the user's Supabase Auth metadata as `avatar_url`.

Set these server environment variables:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

The upload UI accepts image files up to 5 MB. Configure Cloudinary account upload limits as an additional safeguard.

## Focus Room
The Focus Room now includes selectable aesthetic study scenes, 25/5, 50/10 and 90/15 presets, focus/break mode, a countdown timer, task intention, a small checklist and a fullscreen control. Ambient sound is shown as a reserved control; actual audio playback requires licensed audio assets and is not represented as active in this starter.

## Important backend notes
This ZIP updates the existing frontend starter. It does not migrate or replace your Supabase database. The existing doubt form remains a UI preview and is not connected to persistent doubt submission. Mentor/admin authorization, moderation, atomic first-answer-wins submission, notifications, study-session persistence and role-specific access still require schema-aware server-side implementation and RLS testing before production. No service-role key is used in browser code.

## Latest workspace additions

- **Lo-fi Study Room:** a dedicated workspace tab separate from the existing scene backgrounds, with music-style selection, ambient-layer toggles, volume sliders, clock visibility and accent color controls. The supplied starter includes a CSS-drawn lo-fi room preview. Add licensed audio files under `public/sounds` and wire playback to those files if you want actual audio; the sliders and sound-layer controls are UI controls and do not stream audio by themselves.
- **Scene palette:** the Cedar Mountains scene includes a bundled local SVG image and the selected scene adjusts the workspace tint.
- **Sign-in calendar:** records days the authenticated workspace is opened in the current browser. This lightweight activity calendar is local to that browser/device and is not a cross-device attendance record.
- **Community:** create discussions, questions, conversations and polls, vote, and comment. In this starter version, community posts are saved in local browser storage; connect them to Supabase tables and RLS before using them as a shared production community.
- **Meditation:** refreshed calm breathing studio with guided phases, session-length choices and a softer student-friendly layout.
- **Profile photo:** clearer upload validation and Cloudinary setup errors. Configure the Cloudinary variables below before uploading.

### Cloudinary setup for profile photos

Set these server-side variables in `.env.local` (do not prefix the secret with `NEXT_PUBLIC_`):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Restart `npm run dev` after changing environment variables. The upload route creates a short-lived signed upload request after verifying the user's Supabase session.


## Latest workspace polish

- Focus Room now uses photographic environment backgrounds (mountains, rainy night, café, library, ocean, forest and night sky). The selected scene's palette is carried through cards, controls, timer and page surfaces.
- Full screen now targets the complete Focus Room workspace instead of the browser document, so the app navigation is hidden while the study environment is immersive.
- Lo-fi Study Room has a photographic student-at-desk hero scene, a separate dark workspace palette, stronger player styling and clearer sound-layer controls. Music tracks are not bundled; add audio you have rights to use under `public/sounds` before enabling playback.
- Meditation uses a peaceful landscape hero and softer practice panels. Ask Doubts is centered and the dashboard workspace actions are larger.
- Cloudinary profile upload signing has been corrected to use Cloudinary's documented SHA-1 signature format (sorted `name=value` parameters followed by the API secret, not HMAC).

### Cloudinary setup

Copy `.env.example` to `.env.local` and set the values from the **same** Cloudinary product environment:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Keep `CLOUDINARY_API_SECRET` server-only (never prefix it with `NEXT_PUBLIC_`). Restart `npm run dev` after editing `.env.local`. If Cloudinary still rejects a signature, check that the cloud name, API key and API secret belong to the same Cloudinary environment.

### Photo sources

Environment and meditation photographs are loaded from Unsplash image delivery URLs under the Unsplash License. The Lo-fi student-at-desk photograph is from Julio Lopez on Unsplash: https://unsplash.com/photos/young-woman-wearing-headphones-studying-at-a-desk-MRtEiAj9uaM . These images need an internet connection in the browser.
