<table>
	<thead>
		<tr>
			<th>ID</th>
			<th>Event ID</th>
			<th>Status</th>
			<th>New Ticket</th>
		</tr>
	</thead>
	<tbody>
		@foreach($tickets as $ticket)
			<tr>
				<td>{{ $ticket->id }}</td>
				<td>{{ $ticket->event_id}} </td>
				<td>{{ $ticket->status}} </td>
				<td>{{ $ticket->new_ticket}} </td>
			</tr>
		@endforeach
	</tbody>
</table>