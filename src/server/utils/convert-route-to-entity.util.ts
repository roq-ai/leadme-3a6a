const mapping: Record<string, string> = {
  'form-submissions': 'form_submission',
  guests: 'guest',
  'lead-forms': 'lead_form',
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
