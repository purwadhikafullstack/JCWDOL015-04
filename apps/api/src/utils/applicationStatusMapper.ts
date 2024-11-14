export const getFriendlyStatus = (status: string): string => {
  const statusMapping: { [key: string]: string } = {
    active: 'Application Received',
    under_review: 'In Review',
    interview: 'Interview in Progress',
    pending: 'Awaiting Further Steps',
    accepted: 'Offer Extended for Position',
    hired: 'You’re Hired - Welcome Aboard!',
    rejected: 'No Longer Under Consideration',
  };

  return statusMapping[status] || status;
};
